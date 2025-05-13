#!/bin/bash

# Run migrations
python manage.py migrate

# Create superuser only if it doesn't exist
echo "from django.contrib.auth import get_user_model; User = get_user_model(); \
User.objects.filter(username='admin').exists() or \
User.objects.create_superuser('admin', 'admin@example.com', '1234')" \
| python manage.py shell

# Collect static files
python manage.py collectstatic --noinput

# Start the app
gunicorn openlearn_django.wsgi:application --bind 0.0.0.0:8000
