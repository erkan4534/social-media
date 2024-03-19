const Login = () => {
  return (
    <div className="flex ">
      <div className="flex-1 h-dvh">
        <img
          src="https://images.unsplash.com/photo-1710104434504-0261d06fa832?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1">
        <form className="flex flex-col">
          <input placeholder="Email" type="email" />
          <input placeholder="Password" type="email" />
          <button>Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
