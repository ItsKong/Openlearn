FROM python:3.13

# Step 2: Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Step 3: Set working directory
WORKDIR /app

# Step 4: Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# RUN ln -s /usr/local/bin/python3 /usr/local/bin/python

# Step 5: Install Python dependencies
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Step 6: Copy project files
COPY . .

# Step 7: Collect static files (optional but recommended for production)
RUN python manage.py collectstatic --noinput

# Step 8: Expose the port (default for Django)
EXPOSE 8000

# Step 9: Run the app (adjust to your preferred WSGI server)
CMD ["gunicorn", "openlearn_django.wsgi:application", "--bind", "0.0.0.0:8000"]