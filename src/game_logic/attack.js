// Attack related actions

const getWeaponAttack = (weapon) => {
  if (!weapon) {
    return 10;
  }

  const wepAttacks = {
    Fist: 20,
    Knife: 40,
    Dagger: 60,
    'Short sword': 80,
    'Long sword': 100,
  }
  
  return wepAttacks[weapon];
}

const getAttackRange = (actor) => {
  const level = actor.stats.level;
  const weapon = getWeaponAttack(actor.stats.weapon);
  const averAttack = level * weapon;
  return {
    min: averAttack - (averAttack*0.2),
    max: averAttack + (averAttack*0.2),
  };
};

const getDamage = (actor) => {
  const { max, min } = getAttackRange(actor);
  return Math.floor(Math.random()*(max-min)) + min;
}

const takeDamage = (actor, damage) => ({
  ...actor,
  stats: {
    ...actor.stats,
    health: actor.stats.health - damage,
  }
});

const executeAttack = (player, enemy, getDamage) => {
  return [takeDamage(player, getDamage(enemy)), takeDamage(enemy, getDamage(player))];
}

export {
  getWeaponAttack,
  getAttackRange,
  getDamage,
  takeDamage,
  executeAttack,
};