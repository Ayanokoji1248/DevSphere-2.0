# My To-Do List

## 💻 Backend

- [x] Start server using express
- [x] Create user model and make proper schema
- [x] Create auth routes for register and login and logout
- [x] Create post routes CRUD
- [x] Init React with login/register
- [x] add zustand for user
- [x] Add zod validation
- [x] Protected Routes
- [x] call /me endpoint on refresh and update the user state
- [x] Also Added Lottie Animation
- [ ] Add Static files for profilePic and banner Image
- [x] User Logout
- [x] Post Modal for link image & code
- [ ] Lazy Loading/ pagination
- [x] Delete Post
- [x] User Profile and another user profile
- [x] supabase integration for image storage performance wise very low
- [x] use cloudinary for image storage it will be easy and also performance wise
- [x] modal and api of comment and comment modal to show in FE
- [ ] other user profile route in FE
- [x] Edit user profile
- [x] better ui of create post model
- [x] resturcture the html of post page
- [ ] add navigation bar with responsive
- [x] create follow/unfollow routes
- [x] integrate follow and unfollow with react
- [x] create model and schema for project
- [x] create routes for project
- [x] project creation and deletion done
- [x] make particular project page
- [x] add AI code reviewer functionality
- [ ] do small changes where necessary

##### Performance wise it is low very low

## Approach

- So what i was doing is that after register/login i fetch post instantly but what i was thinkging that fetching post will take time and in login page it will show keep loading until all posts comes so what we will do is we will move fetchPost function to homepage and check if user is authenticated if it is then only we fetch post

```
    Never make global loading state instead of that make local loading state on eact component when needed
```

1️⃣ Problem

After login, you go to /home correctly, but on refresh, the app redirects to /login.

Reason: isAuthenticated in the store is false by default, and the app checks it before restoring the session from the backend.

2️⃣ Solution

We introduced a loading/initializing mechanism to handle session restoration:

Add initializing or loading state:

This state tracks whether the app is checking for an existing user session.

While true, we show a loading spinner or Lottie animation instead of redirecting.

Restore session on app load:

Use useEffect in App.tsx to call a backend endpoint like /user/me.

If the response is valid:

Set user data in userStore.

Set isAuthenticated = true.

If not valid:

Set isAuthenticated = false.

Finally, set initializing = false.

ProtectedRoute component:

If loading/initializing = true → show spinner or Lottie.

Else if isAuthenticated = false → redirect to /login.

Else → render the protected route (<Outlet />).
