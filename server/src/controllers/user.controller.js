const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    res.status(200).json({
      message: "User created successfully",
      user: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createUser };
