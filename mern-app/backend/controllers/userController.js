export async function getUserProfile(req, res) {
  const { userId } = req.params;
  // Fetch user data from DB (or hardcoded for now)
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}
