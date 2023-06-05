const signupFrom = () => {
    return (
        <div>
            <h1>Signup</h1>
            <form action="">
                <span>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Username" />
                </span>
                <span>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" />
                </span>
            </form>
        </div>
    )
}

export default signupFrom