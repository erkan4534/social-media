import "./Login.css";

const Login = () => {
  return (
    <div className="flex">
      <div className="flex-1 h-dvh">
        <img
          src="https://images.unsplash.com/photo-1710104434504-0261d06fa832?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1">
        <div className="loginForm">
          <form>
            <div className="flex flex-col gap-2">
              <input placeholder="Email" type="email" className="loginInput" />
              <input
                placeholder="Password"
                type="password"
                className="loginInput"
              />
            </div>

            <div className="mt-3 flex justify-between">
              <button className="loginButton">Log In</button>
              <button className="loginButton">Create a New Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
