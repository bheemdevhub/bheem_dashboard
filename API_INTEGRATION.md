# API Integration Documentation

## Overview
This Vue.js dashboard has been integrated with the ERP backend API for authentication and user management.

## API Configuration

### Base URL
```
https://erpbackend.bheem.cloud
```

### Authentication Endpoint
```
POST /api/auth/auth/login
```

### Request Format
- **Content-Type**: `application/x-www-form-urlencoded`
- **Method**: POST

### Request Body
```
email=user@example.com&password=userpassword
```

### Response Format
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "employee": {
        "id": "16bc398a-9f96-45b0-b72b-31d91f7f3165",
        "username": "bheemverse@gmail.com",
        "role": "SuperAdmin",
        "company_id": "10d5a0f2-1534-42a7-8b5b-a2c7f123ddb2",
        "is_active": true
    }
}
```

## Implementation Details

### Auth Store (`src/store/auth.js`)
- **State Management**: Uses Pinia for centralized authentication state
- **Token Storage**: JWT tokens stored in localStorage for persistence
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **API Integration**: Real API calls to the ERP backend

#### Key Features:
- Real API authentication with form-urlencoded requests
- JWT token management with bearer authentication
- User session persistence across browser refreshes
- Automatic avatar generation for users
- Helper methods for making authenticated API requests

### Components Updated

#### 1. LoginView (`src/views/LoginView.vue`)
- **Form Handling**: Updated to use new authentication structure
- **Error Display**: Shows API errors to users
- **Loading States**: Visual feedback during login process
- **Responsive Design**: Modern, mobile-friendly login interface

#### 2. NavbarComponent (`src/components/NavbarComponent.vue`)
- **User Display**: Shows authenticated user information
- **Avatar Integration**: Displays user avatar and role
- **Logout Functionality**: Proper session cleanup

#### 3. DashboardView (`src/views/DashboardView.vue`)
- **Welcome Message**: Personalized greeting using real user data
- **User Context**: Access to authenticated user information

#### 4. SidebarComponent (`src/components/SidebarComponent.vue`)
- **Menu Items**: Complete sidebar with all requested menu items:
  - Approvals
  - HR
  - Department
  - Permission
  - API
  - Accounting
  - Reports
  - SKU
  - Billing
  - Bundle Items
  - Customers
  - Organisation Chart

## Security Features

### Token Management
- **Bearer Authentication**: Standard JWT token implementation
- **Secure Storage**: Tokens stored in localStorage
- **Automatic Cleanup**: Tokens cleared on logout

### Error Handling
- **Network Errors**: Proper handling of connection issues
- **Authentication Errors**: Clear feedback for invalid credentials
- **Token Expiration**: Automatic logout on expired tokens

### API Security
- **HTTPS Only**: All API calls use secure HTTPS connection
- **Content-Type Validation**: Proper form-urlencoded formatting
- **Authorization Headers**: JWT tokens sent in Authorization header

## User Experience

### Login Flow
1. User enters email and password
2. Form validation occurs client-side
3. API request sent to backend
4. Success: User redirected to dashboard
5. Error: Clear error message displayed

### Session Management
- **Persistence**: User stays logged in across browser sessions
- **Automatic Logout**: Session cleared on explicit logout
- **State Restoration**: User state restored on page refresh

## Development Features

### Environment Configuration
- **API Base URL**: Configurable endpoint for different environments
- **Token Validation**: Optional server-side token verification
- **Refresh Tokens**: Framework for implementing token refresh

### Error Debugging
- **Console Logging**: Detailed error logs for development
- **Network Monitoring**: API calls visible in browser dev tools
- **State Debugging**: Pinia devtools integration

## Testing

### Manual Testing
1. Navigate to `http://localhost:8081`
2. Use valid credentials to test login
3. Verify user information displays correctly
4. Test logout functionality
5. Verify session persistence

### API Testing
- **Postman Integration**: API tested with Postman
- **Error Cases**: Invalid credentials handled properly
- **Success Cases**: Valid logins work as expected

## Future Enhancements

### Potential Improvements
1. **Token Refresh**: Implement automatic token refresh
2. **Role-Based Access**: Restrict features based on user role
3. **Profile Management**: Allow users to update their profiles
4. **Password Reset**: Implement forgot password functionality
5. **Two-Factor Authentication**: Add 2FA support

### API Extensions
1. **Logout Endpoint**: Server-side logout for token invalidation
2. **Token Verification**: Real-time token validation
3. **User Profile**: Fetch additional user information
4. **Company Data**: Integrate company-specific features

## Configuration Files

### Updated Files
- `src/store/auth.js` - Complete authentication store
- `src/views/LoginView.vue` - Updated login form
- `src/components/NavbarComponent.vue` - User display updates
- `src/views/DashboardView.vue` - User context integration
- `src/components/SidebarComponent.vue` - Menu structure

### Dependencies
- Vue 3.2.13
- Pinia 2.0.11
- Vue Router 4.0.3
- Heroicons for icons

## Contact
For API-related questions or issues, contact the backend development team.
