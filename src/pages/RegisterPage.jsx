export default function RegisterPage() {
  return (
    <form>
      <label htmlFor="name">
        Your name
        <input type="text" name="name" id="name" />
      </label>
      <label htmlFor="email">
        Email
        <input type="email" name="email" id="email" />
      </label>
      <label htmlFor="password">
        Password
        <input type="password" name="password" id="password" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
