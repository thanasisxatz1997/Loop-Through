export default function ProtectedRoute({ children }) {
  //1. Load the authenticated user

  //2. While loading, show a spinner
  //3. If there is NO authenticated user, redirect to the /login
  //4. If there Is a user, render the app
  return children;
}
