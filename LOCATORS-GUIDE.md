# 🔍 Playwright Locators Reference Guide

## Saucedemo.com Test Site

This guide provides all the locators used across different pages in the Saucedemo.com application for Playwright tests.

---

## 📝 LOGIN PAGE LOCATORS

### Elements:

- **Username Input**: `page.locator('#user-name')`
- **Password Input**: `page.locator('#password')`
- **Login Button**: `page.locator('#login-button')`
- **Error Message**: `page.locator('[data-test="error"]')`

### Usage Example:

```javascript
await page.locator("#user-name").fill("standard_user");
await page.locator("#password").fill("secret_sauce");
await page.locator("#login-button").click();
```

---

## 🛍️ INVENTORY PAGE LOCATORS

### Elements:

- **Page Title**: `page.locator('.title')`
- **Cart Badge**: `page.locator('.shopping_cart_badge')`
- **Cart Link**: `page.locator('.shopping_cart_link')`
- **Add Backpack Button**: `page.locator('#add-to-cart-sauce-labs-backpack')`
- **Add Bike Light Button**: `page.locator('#add-to-cart-sauce-labs-bike-light')`
- **All Products**: `page.locator('.inventory_item')`
- **Product Names**: `page.locator('.inventory_item_name')`
- **Product Prices**: `page.locator('.inventory_item_price')`

### Usage Example:

```javascript
await page.locator("#add-to-cart-sauce-labs-backpack").click();
const productCount = await page.locator(".inventory_item").count();
```

---

## 🛒 CART PAGE LOCATORS

### Elements:

- **Page Title**: `page.locator('.title')`
- **Cart Items**: `page.locator('.cart_item')`
- **Item Names**: `page.locator('.inventory_item_name')`
- **Item Quantities**: `page.locator('.cart_quantity')`
- **Continue Shopping Button**: `page.locator('#continue-shopping')`
- **Checkout Button**: `page.locator('#checkout')`
- **Remove Buttons**: `page.locator('[id^="remove-"]')`

### Usage Example:

```javascript
const itemCount = await page.locator(".cart_item").count();
await page.locator("#checkout").click();
```

---

## 📋 CHECKOUT STEP ONE LOCATORS

### Elements:

- **Page Title**: `page.locator('.title')`
- **First Name Field**: `page.locator('#first-name')`
- **Last Name Field**: `page.locator('#last-name')`
- **Postal Code Field**: `page.locator('#postal-code')`
- **Continue Button**: `page.locator('#continue')`
- **Cancel Button**: `page.locator('#cancel')`
- **Error Message**: `page.locator('[data-test="error"]')`

### Usage Example:

```javascript
await page.locator("#first-name").fill("John");
await page.locator("#last-name").fill("Doe");
await page.locator("#postal-code").fill("12345");
await page.locator("#continue").click();
```

---

## 📊 CHECKOUT STEP TWO LOCATORS

### Elements:

- **Page Title**: `page.locator('.title')`
- **Cart Items**: `page.locator('.cart_item')`
- **Item Names**: `page.locator('.inventory_item_name')`
- **Payment Info**: `page.locator('.summary_info_label')`
- **Shipping Info**: `page.locator('.summary_value_label')`
- **Item Total**: `page.locator('.summary_subtotal_label')`
- **Tax**: `page.locator('.summary_tax_label')`
- **Total Price**: `page.locator('.summary_total_label')`
- **Finish Button**: `page.locator('#finish')`
- **Cancel Button**: `page.locator('#cancel')`

### Usage Example:

```javascript
const total = await page.locator(".summary_total_label").textContent();
await page.locator("#finish").click();
```

---

## ✅ CHECKOUT COMPLETE LOCATORS

### Elements:

- **Page Title**: `page.locator('.title')`
- **Complete Header**: `page.locator('.complete-header')`
- **Complete Text**: `page.locator('.complete-text')`
- **Pony Express Image**: `page.locator('.pony_express')`
- **Back Home Button**: `page.locator('#back-to-products')`

### Usage Example:

```javascript
await expect(page.locator(".complete-header")).toContain(
  "Thank you for your order!"
);
await page.locator("#back-to-products").click();
```

---

## 🎯 COMMON LOCATOR PATTERNS

### Locator Types:

- **By ID**: `page.locator('#element-id')`
- **By Class**: `page.locator('.class-name')`
- **By Data-Test Attribute**: `page.locator('[data-test="attribute"]')`
- **By Text**: `page.locator('text=Button Text')`
- **By Role**: `page.getByRole('button', { name: 'Click Me' })`
- **By Placeholder**: `page.getByPlaceholder('Enter text')`
- **Nth Element**: `page.locator('.item').nth(0)`
- **Contains Text**: `page.locator('text=partial text')`

### Advanced Patterns:

- **Starts With**: `page.locator('[id^="remove-"]')` (for remove buttons)
- **Contains**: `page.locator('[class*="cart"]')` (contains "cart" in class)
- **Multiple Classes**: `page.locator('.inventory_item.selected')`
- **Parent/Child**: `page.locator('.cart_item >> .inventory_item_name')`
- **First/Last**: `page.locator('.inventory_item').first()`

---

## 💡 BEST PRACTICES

### 1. **Use Stable Locators**

Prefer ID and data-test attributes over CSS classes that might change.

### 2. **Be Specific**

Use the most specific locator that uniquely identifies the element.

### 3. **Avoid Fragile Selectors**

Don't rely on complex XPath or deep CSS selectors.

### 4. **Use Page Object Model**

Centralize locators in Page Object classes for maintainability.

### Example Page Object:

```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator("#user-name");
    this.passwordField = page.locator("#password");
    this.loginButton = page.locator("#login-button");
  }
}
```

---

## 🚀 TESTING COMMANDS

### Run Tests:

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/login.spec.js

# Run with browser visible
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Run in specific browser
npx playwright test --project=chromium
```

### Generate Locators:

```bash
# Open Playwright inspector
npx playwright codegen https://www.saucedemo.com
```

---

**Created by: Naif Faris**  
**Project: Playwright Test Automation Suite**  
**Target: Saucedemo.com E-commerce Site**
