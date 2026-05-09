"""
WorkLifeLM Stripe Billing Module
Handles checkout sessions, webhook events, and subscription management.
"""
import stripe
import os
from auth import update_user_tier, get_user_by_id

# Stripe configuration
STRIPE_SECRET_KEY = os.environ.get("STRIPE_SECRET_KEY", "")
STRIPE_PUBLISHABLE_KEY = os.environ.get("STRIPE_PUBLISHABLE_KEY", "")

stripe.api_key = STRIPE_SECRET_KEY

# Price IDs for each tier
PRICE_IDS = {
    "professional": os.environ.get("STRIPE_PRICE_PRO", "price_1TVH1X6X8IBUtLKfDceZcaua"),
    "max": os.environ.get("STRIPE_PRICE_MAX", "price_1TVH286X8IBUtLKfGSzh52PJ"),
}

# Reverse lookup: price_id -> tier
PRICE_TO_TIER = {v: k for k, v in PRICE_IDS.items()}


def create_checkout_session(user_id: int, user_email: str, tier: str, success_url: str, cancel_url: str) -> dict:
    """Create a Stripe Checkout session for upgrading to a paid tier."""
    price_id = PRICE_IDS.get(tier)
    if not price_id:
        raise ValueError(f"Unknown tier: {tier}")

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        mode="subscription",
        customer_email=user_email,
        line_items=[{"price": price_id, "quantity": 1}],
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={"user_id": str(user_id), "tier": tier},
    )
    return {"session_id": session.id, "url": session.url}


def handle_webhook_event(payload: bytes, sig_header: str, webhook_secret: str) -> dict:
    """Process a Stripe webhook event."""
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
    except stripe.error.SignatureVerificationError:
        raise ValueError("Invalid webhook signature")

    event_type = event["type"]
    data = event["data"]["object"]

    if event_type == "checkout.session.completed":
        user_id = int(data["metadata"].get("user_id", 0))
        tier = data["metadata"].get("tier", "professional")
        customer_id = data.get("customer", "")
        subscription_id = data.get("subscription", "")

        if user_id:
            update_user_tier(user_id, tier, customer_id, subscription_id)
            return {"action": "upgraded", "user_id": user_id, "tier": tier}

    elif event_type == "customer.subscription.updated":
        subscription_id = data.get("id", "")
        status = data.get("status", "")
        price_id = data.get("items", {}).get("data", [{}])[0].get("price", {}).get("id", "") if data.get("items") else ""
        new_tier = PRICE_TO_TIER.get(price_id, "professional")

        # Find user by subscription_id and update
        if status == "active":
            return {"action": "subscription_updated", "tier": new_tier, "status": status}

    elif event_type == "customer.subscription.deleted":
        # Downgrade to free
        return {"action": "subscription_cancelled", "tier": "free"}

    return {"action": "ignored", "event_type": event_type}


def create_billing_portal(customer_id: str, return_url: str) -> dict:
    """Create a Stripe Customer Portal session for managing subscriptions."""
    session = stripe.billing_portal.Session.create(
        customer=customer_id,
        return_url=return_url,
    )
    return {"url": session.url}
