const pickupWeapon = (player, wepName) => ({
  ...player,
  stats: {
    ...player.stats,
    weapon: wepName,
  },
});

export {
  pickupWeapon,
};