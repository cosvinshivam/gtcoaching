import os
import json
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models

# Ensure tables are created
Base.metadata.create_all(bind=engine)

def seed_content():
    db = SessionLocal()
    try:
        # Default content data
        default_data = {
            "hero_title": "Unleash your potential with expert sports coaching",
            "hero_subtitle": "Elevating athletes daily through coaching, proven methods, and dedicated support",
            "hero_review_text": "Rated 4.9/5 from over 600 reviews",
            
            "about_heading": "Building champions",
            "about_desc": "We combine advanced data metrics with elite-level coaching experience to provide the best performance enhancement systems in the world.",
            
            "pricing_plans": json.dumps([
              {
                "name": "Starter Plan",
                "monthlyPrice": 199,
                "monthlyWas": 249,
                "yearlyPrice": 159,
                "yearlyWas": 199,
                "features": ["Intro session", "Weekly coaching", "Monthly coaching", "Group coaching", "Performance assessment"]
              },
              {
                "name": "Standard Plan",
                "monthlyPrice": 299,
                "monthlyWas": 349,
                "yearlyPrice": 249,
                "yearlyWas": 299,
                "features": ["Intro session", "Weekly coaching", "Monthly coaching", "Group coaching", "Performance assessment", "Video analysis"],
                "popular": True
              },
              {
                "name": "Premium Plan",
                "monthlyPrice": 499,
                "monthlyWas": 599,
                "yearlyPrice": 399,
                "yearlyWas": 499,
                "features": ["Intro session", "Weekly coaching", "Monthly coaching", "Group coaching", "Performance assessment", "Video analysis", "Custom training plan", "Nutrition plan"]
              },
              {
                "name": "Customize Plan",
                "monthlyPrice": "Custom",
                "monthlyWas": None,
                "yearlyPrice": "Custom",
                "yearlyWas": None,
                "features": ["Intro session", "Weekly coaching", "Monthly coaching", "Group coaching", "Performance assessment", "Video analysis", "Custom training plan", "Nutrition plan", "Dedicated 1-on-1 support"]
              }
            ])
        }

        for key, val in default_data.items():
            existing = db.query(models.SiteContent).filter(models.SiteContent.section_key == key).first()
            if existing:
                existing.content_value = str(val)
            else:
                new_content = models.SiteContent(section_key=key, content_value=str(val))
                db.add(new_content)
        
        db.commit()
        print("CMS Content seeded successfully.")
    except Exception as e:
        print(f"Error seeding data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_content()
