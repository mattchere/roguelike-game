const heal = (player, healthItem) => ({
  ...player,
  stats: {
    ...player.stats,
    health: player.stats.health + healthItem.healAmount,
  }
});

export {
  heal
};