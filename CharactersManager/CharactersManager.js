import Character from './Character';

const info = {
	name: "Character Manager Plugin",
	description: "Get/Upgrade characters stats and stuff",
	author: "AbdSab",
	version: "0.0.1"
}

class CharactersManager {

	constructor(){
		this.config = config;
		this.connections = {};
		this.listeners = [this.SpellListMessage, this.CharacterStatsListMessage];
		this.characters = {};
	}

	mount(connections){
		this.connections = connections;
		for(let username in connection){
			this.character[username] = new Character(username);
		}
	}

	/**
	 * Get character's current kamas
	 * 
	 * @param {String} username 
	 * @return {Number} Kamas
	 */
	getKamas(username){
		if(!this.isUsernameExists) return;
		return this.characters[username].kamas;
	}
	
	/**
	 * Get character's current spells
	 * 
	 * @param {String} username
	 * @return {Object} Spells 
	 */
	getSpells(username){
		if(!this.isUsernameExists) return;
		return this.characters[username].spells;
	}

	/**
	 * Get character's current level
	 * 
	 * @param {String} username 
	 * @return {Number} Level
	 */
	getLevel(username){
		if(!this.isUsernameExists) return;
		return this.characters[username].level;
	}

	/**
	 * get character's stats elements
	 * 
	 * @param {String} username 
	 * @return {Object} Elements
	 */
	getElementsStats(username){
		if(!this.isUsernameExists) return;
		return this.characters[username].elements;
	}

	/**
	 * Get character's current lifepoints
	 * 
	 * @param {String} username 
	 * @return {Number} Lifepoints
	 */
	getLifePoints(username){
		if(!this.isUsernameExists) return;
		return this.characters[username].lifePoints.current;
	}

	/**
	 * Get character's max lifepoints
	 * 
	 * @param {String} username 
	 * @return {Number} Max Lifepoints
	 */
	getMaxLifePoints(username){
		if(!this.isUsernameExists) return;
		return this.characters[username].lifePoints.max;
	}

	/**
	 * Get character's Action Points (AP)
	 * 
	 * @param {String} username 
	 * @return {Number} AP
	 */
	getAp(username){
		if(!this.isUsernameExists) return;
		return this.characters[username].AP;
	}

	/**
	 * Get character's Movement Points (MP)
	 * 
	 * @param {String} username 
	 * @return {Number} MP
	 */
	getMP(username){
		if(!this.isUsernameExists) return;
		return this.characters[username].MP;
	}

	/**
	 * Get character's state points
	 * 
	 * @param {String} username 
	 * @return {Number} State points
	 */
	getStatsPoints(username){
		if(!this.isUsernameExists) return;
		return this.characters[username].MP;
	}

	/**
	 * Get character's spell points
	 * 
	 * @param {String} username 
	 * @return {Number} Spell points
	 */
	getSpellPoints(username){
		if(!this.isUsernameExists) return;
		return this.characters[username].MP;
	}

	/**
	 * Add points to a character.
	 * 
	 * @param {String} username 
	 * @param {Number} statId 
	 * @param {Number} points 
	 */
	addElementPoints(username, statId, points){
		if(!this.isUsernameExists) return;

		const character = this.characters[username];
		if(points > character.statsPoints) {
			console.log(`Make sure to enter ${character.statsPoints} or less !`);
		};

		const data = {
			statId,
			boostPoint:points,
			useAdditionnal:false
		}
		this.connections[username].sendMessage("StatsUpgradeRequestMessage", data);
	}

	/**
	 * Add level to a selected spell.
	 * 
	 * @param {String} username 
	 * @param {Number} spellId 
	 * @param {Number} spellLevel 
	 */
	spellUpgrade(username, spellId, spellLevel){
		if(!this.isUsernameExists) return;

		const character = this.characters[username];

		if(spellLevel > character.spells[spellId].spellLevel){
			console.log(`Make sure to enter ${character.spells[spellId].spellLevel} or less !`);
			return;
		}

		const data = {
			spellId,
			spellLevel
		}

		this.connections[username].sendMessage("SpellUpgradeRequestMessage", data);
	}

	/**
	 * Update character's stats
	 * 
	 * @param {Object} payload 
	 */
	CharacterStatsListMessage(payload){
		const {stats, socket} = payload;
		const destination = socket.account.username;
		this.characters[destination].updateStat(stats);
	}

	/**
	 * Get character's spells
	 * 
	 * @param {Object} payload 
	 */
	SpellListMessage(payload){
		const {spells, socket} = payload;
		const destination = socket.account.username;
		this.characters[destination].spells.forEach(({spellId, spellLevel}) => {
			this.spells[spellId] = spellLevel;
		});
	}

	/**
	 * Get character's level
	 * 
	 * @param {Object} payload 
	 */
	CharacterLevelUpMessage(payload){
		const {newLevel} = payload;
		this.state.level = newLevel;
	}

	/**
	 * Get character's new learned spell
	 * 
	 * @param {Object} payload 
	 */
	SpellUpgradeSuccessMessage(payload){
		const {spellId, spellLevel, socket} = payload;
		const destination = socket.account.username;
		this.characters[destination].spells[spellId] = spellLevel;
	}

	
	isUsernameExists(username){
		if(username in this.connections) return true;
		console.log(`Error in username !`);
		return false;
	}

}

export default Character;