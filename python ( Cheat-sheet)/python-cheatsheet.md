# Python Concepts Cheatsheet

## 1. Basic Data Types

### Numbers
```python
# Integer
age = 25  # Age of a person
population = 1_000_000  # City population (underscore for readability)

# Float
temperature = 98.6  # Body temperature
bank_balance = 1234.56  # Account balance

# Complex
signal_data = 3 + 4j  # Signal processing in telecommunications
```

### Strings
```python
# String creation and formatting
name = "Alice"
greeting = f"Hello, {name}!"  # Welcome message
email = """
Dear Customer,
Thank you for your purchase.
Best regards,
Shop Team
"""  # Multi-line email template

# String operations
product_code = "ABC-123"
category = product_code.split('-')[0]  # Extract product category
phone = "+1-555-0123"
clean_phone = phone.replace("-", "")  # Clean phone number
```

### Boolean
```python
# Real-world conditions
is_logged_in = True
has_permission = False
can_access = is_logged_in and has_permission  # Access control

# Temperature check system
temperature = 99.5
is_fever = temperature > 98.6
```

## 2. Data Structures

### Lists
```python
# Shopping cart
cart = ['apple', 'banana', 'orange']
cart.append('mango')  # Add item
cart.remove('banana')  # Remove item
total_items = len(cart)  # Count items

# Grade management
grades = [85, 92, 78, 95, 88]
average = sum(grades) / len(grades)
highest_grade = max(grades)
```

### Dictionaries
```python
# User profile
user = {
    'username': 'john_doe',
    'email': 'john@example.com',
    'age': 30,
    'active': True
}
user['location'] = 'New York'  # Add new information

# Product inventory
inventory = {
    'ABC123': {'name': 'Laptop', 'price': 999.99, 'stock': 50},
    'XYZ789': {'name': 'Mouse', 'price': 29.99, 'stock': 100}
}
```

### Tuples
```python
# Geographic coordinates
location = (40.7128, -74.0060)  # New York coordinates
latitude, longitude = location  # Unpacking

# RGB Color values
color = (255, 128, 0)  # Orange color
```

### Sets
```python
# Unique website visitors
daily_visitors = {'user1', 'user2', 'user3', 'user1'}  # Duplicates removed
new_visitor = 'user4'
daily_visitors.add(new_visitor)

# Feature access control
basic_features = {'read', 'write'}
premium_features = {'read', 'write', 'admin', 'export'}
user_has_access = basic_features.issubset(premium_features)
```

## 3. Control Flow

### If-Else Statements
```python
# Payment processing
def process_payment(amount, balance):
    if balance >= amount:
        balance -= amount
        return "Payment successful"
    elif balance > 0:
        return "Insufficient funds"
    else:
        return "Account empty"

# Weather advice
def get_weather_advice(temperature):
    if temperature > 90:
        return "Stay hydrated, it's hot!"
    elif temperature < 32:
        return "Wear warm clothes!"
    else:
        return "Pleasant weather!"
```

### Loops
```python
# Email notification system
for user in users:
    if user['notifications_enabled']:
        send_email(user['email'])

# Retry mechanism
attempts = 3
while attempts > 0:
    try:
        connect_to_server()
        break
    except ConnectionError:
        attempts -= 1
```

## 4. Functions

### Basic Functions
```python
# Calculate total price with tax
def calculate_total(price, tax_rate=0.1):
    return price + (price * tax_rate)

# User input validation
def validate_password(password):
    has_length = len(password) >= 8
    has_number = any(char.isdigit() for char in password)
    has_upper = any(char.isupper() for char in password)
    return all([has_length, has_number, has_upper])
```

### Lambda Functions
```python
# Sort products by price
products.sort(key=lambda x: x['price'])

# Quick temperature conversion
celsius_to_fahrenheit = lambda c: (c * 9/5) + 32
```

## 5. Object-Oriented Programming

### Classes
```python
class BankAccount:
    def __init__(self, account_number, balance=0):
        self.account_number = account_number
        self.balance = balance
        self.transactions = []
    
    def deposit(self, amount):
        self.balance += amount
        self.transactions.append(f"Deposit: {amount}")
    
    def withdraw(self, amount):
        if self.balance >= amount:
            self.balance -= amount
            self.transactions.append(f"Withdrawal: {amount}")
            return True
        return False

# Usage
account = BankAccount("1234567890")
account.deposit(1000)
account.withdraw(500)
```

## 6. Exception Handling

```python
# File processing with error handling
def read_config_file(filename):
    try:
        with open(filename, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Config file {filename} not found")
        return default_config()
    except json.JSONDecodeError:
        print("Invalid config file format")
        return default_config()
```

## 7. File Operations

```python
# Log file management
def log_activity(activity):
    with open('app.log', 'a') as log:
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log.write(f"{timestamp}: {activity}\n")

# CSV data processing
import csv
def export_user_data(users):
    with open('users.csv', 'w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=['name', 'email'])
        writer.writeheader()
        writer.writerows(users)
```

## 8. List Comprehensions

```python
# Filter active users
active_users = [user for user in users if user['active']]

# Generate email list
emails = [user['email'] for user in users if user['subscribed']]

# Price calculation with tax
prices_with_tax = [price * 1.2 for price in prices]
```

## 9. Decorators

```python
# Performance monitoring
def timing_decorator(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end-start:.2f} seconds")
        return result
    return wrapper

@timing_decorator
def process_data(data):
    # Process data here
    pass
```

## 10. Common Libraries

### Working with Dates
```python
from datetime import datetime, timedelta

# Appointment scheduling
def schedule_appointment(date_str):
    appointment_date = datetime.strptime(date_str, '%Y-%m-%d')
    reminder_date = appointment_date - timedelta(days=1)
    return reminder_date
```

### JSON Processing
```python
import json

# API response handling
def parse_api_response(response_text):
    try:
        data = json.loads(response_text)
        return data['results']
    except json.JSONDecodeError:
        return None
```

## Best Practices

1. Variable Naming:
```python
# Good
user_name = "John"
total_amount = 100.50
is_active = True

# Avoid
n = "John"  # unclear
t = 100.50  # unclear
```

2. Function Design:
```python
# Good: Single responsibility
def validate_email(email):
    return '@' in email and '.' in email

# Good: Clear parameters
def create_user(username, email, password):
    # Create user logic
    pass
```

3. Error Handling:
```python
# Good: Specific exception handling
try:
    value = data['key']
except KeyError:
    value = default_value
except TypeError:
    handle_type_error()
```
