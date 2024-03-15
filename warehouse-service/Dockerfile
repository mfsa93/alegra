FROM php:8.2-apache

COPY composer.json composer.lock /var/www/html/

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    autoconf \
    g++ \
    make \
    && docker-php-ext-install pdo pdo_mysql \
    && a2enmod rewrite

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

# Creating a new user "appuser"
RUN useradd -m -s /bin/bash appuser

# Copy the application source code
COPY . /var/www/html

# Change ownership of all files to appuser
RUN chown -R appuser:appuser /var/www/html

# Switch to appuser
USER appuser

# Running Composer as the "appuser"
RUN composer update && composer install

# Switch back to root to perform operations that require root privileges
USER root

# Permissions adjustment, if necessary
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80
