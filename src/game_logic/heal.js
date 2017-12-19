const heal = (player, healAmount) => ({
  ...player,
  stats: {
    ...player.stats,
    health: player.stats.health + healAmount,
  }
});

export {
  heal
};