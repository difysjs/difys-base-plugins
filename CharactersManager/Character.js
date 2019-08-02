import { sumOfElementPoints } from './utils';

/**
 * The stats data of the character
 */
class Character {

	constructor(username){
		this.username = username;
		this.level = {};
		this.elements = {};
		this.actionPoints = 0;
		this.movementPoints = 0;
		this.lifePoints = {};
		this.kamas = 0;
		this.statsPoints = 0;
		this.spellsPoints = 0;
		this.spells = {};
	}

	updateStat(stats){

		//Updating Kamas
		const {kamas} = stats;
		this.kamas = kamas;

		//Update State & Spell points
		const {spellsPoints, statsPoints} = stats;
		this.spellsPoints = spellsPoints;
		this.statsPoints = statsPoints;

		//Updating Elements Stats
		const {vitality, strength, agility, chance, intelligence, wisdom} = stats;
		this.elements = {
			vitality: sumOfElementPoints(vitality),
			strength: sumOfElementPoints(strength),
			agility: sumOfElementPoints(agility),
			chance: sumOfElementPoints(chance),
			intelligence: sumOfElementPoints(intelligence),
			wisdom: sumOfElementPoints(wisdom)
		}

		//Updating AP & MP
		const {actionPointsCurrent, movementPointsCurrent} = stats;
		this.actionPoints = actionPointsCurrent;
		this.movementPoints = movementPointsCurrent;


		//Updating life points
		const {lifePoints, maxLifePoints} = stats;
		this.lifePoints = {
			current: lifePoints,
			max: maxLifePoints
		}

		//Update level & xp
		const {experience, experienceLevelFloor, experienceNextLevelFloor} = stats;
		this.level = {
			currentXp: experience,
			nextLevelXp: experienceNextLevelFloor,
			currentLevelXpFloor: experienceLevelFloor
		}

	}
}

export default CharacterStats;