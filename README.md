# Online Tech Tutor for Online Courses

## Table of Contents

1. [Introduction](#introduction)
2. [Folder Structure](#folder-structure)
3. [Features](#features)
4. [Usage](#usage)
5. [API Documentation](#api-documentation)
6. [License](#license)

## Introduction

Welcome to Online Tech Tutor for Online Courses! This project provides a comprehensive platform for managing online courses and associated services.

## Folder Structure

The project is organized into the following main directories:

- **Controllers:** Contains controllers for handling various functionalities such as authentication, course management, quizzes, reviews, etc.
- **Models:** Defines data models for users, courses, categories, quizzes, reviews, lessons, coupons, certificates, etc.
- **Services:** Implements business logic for authentication, course management, quizzes, reviews, lessons, coupons, certificates, search, password handling, etc.
- **Routes:** Defines routes for accessing API endpoints related to coupons, certificates, search, password management, etc.
- **Utils:** Includes utility functions and modules for handling errors, JWT generation, HTTP status texts, logging, email sending, certificate generation, etc.
- **Certificates:** Stores generated certificate PDFs for courses.

## Features

- **Authentication:** User login, registration, and session management.
- **Course Management:** Create, edit, delete courses and manage lessons.
- **Quizzes:** Create quizzes associated with courses.
- **Reviews:** Allow users to review courses.
- **Certificates:** Generate and issue certificates upon course completion.
- **Search:** Search functionality to find courses based on various criteria.
- **Password Management:** Reset and update user passwords securely.

## Usage
Once the application is installed and running, you can perform the following actions:

- **Register as a new user or log in with existing credentials.
- **Create, manage, and enroll in courses.
- **Take quizzes associated with courses and review course content.
- **Receive certificates upon completing courses.
- **Use the search functionality to find specific courses.
- **Video Lessons: Seamlessly upload and stream video lessons using Cloudinary.
- **Profile Images: Upload and manage user profile images with Multer.

## API Documentation
- **View here https://onlinetechtutor.docs.apiary.io/#reference/0/lessons

# Database Schema
## User
- `id` (PK)
- `fullName`
- `email`
- `password`
- `confirmPassword`
- `token`
- `role`
- `avatar`

## Course
- `id` (PK)
- `title`
- `description`
- `instructor` (FK -> User.id)
- `category` (FK -> Category.id)

## Category
- `id` (PK)
- `name`
- `description`

## Certificate
- `id` (PK)
- `course` (FK -> Course.id)
- `user` (FK -> User.id)
- `issueDate`
- `certificateUrl`

## Coupon
- `id` (PK)
- `code`
- `discount`
- `expiryDate`

## Enrollment
- `id` (PK)
- `course` (FK -> Course.id)
- `user` (FK -> User.id)
- `date`

## Lesson
- `id` (PK)
- `title`
- `description`
- `video`
- `course` (FK -> Course.id)

## Quiz
- `id` (PK)
- `lesson` (FK -> Lesson.id)
- `questions`

## Review
- `id` (PK)
- `user` (FK -> User.id)
- `course` (FK -> Course.id)
- `rating`
- `comment`

## Wishlist
- `id` (PK)
- `course` (FK -> Course.id)
- `date`

![relation](C:\Users\engmo\Desktop\Tech-Tutor-RelationDB.png)