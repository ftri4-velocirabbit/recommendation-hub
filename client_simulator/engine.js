/**
 * Engine is used to rhythmically hit a series of endpoints on a remote server.
 */

// State variables
let clockTick; // ms
let intervalID = null;
let commands = null;
let commandPointer = 0;
let timeoutUntil = Date.now() - 1000;

/**
 * Initiate the fetch engine that will begin to make api calls.
 * @param {undefined | [string, number | function | [functions]]} cmds - Array of commands to be executed by the engine at each tick.
 * @param {number} tick - number of millisecond between engine command executions
 * 
 * The following commands may be used:
 * ['SKIP', n] - Timeout moving to next command for n milliseconds.
 * ['RUN', callback | [callback]] - Run a callback or each callback if passing in an array of callbacks.
 * ['REPEAT', n] - Repeats the last command n times.
 * 
 * @public
 */
function start(cmds, tick = 2000) {
  if (typeof tick !== 'number') throw new TypeError('Tick must be a number');
  if (!cmds && !commands) throw new Error('No commands stored in memory or passed into start call.');
  if (cmds) {
    const commandError = new TypeError('commands must be an array of [string, number | function | [functions]] tuples');
    if (!(cmds instanceof Array)) throw commandError;
    for (const command of cmds) {
      if (command.length !== 2 || typeof command[0] !== 'string') {
        throw commandError;
      }
      if (typeof command[1] !== 'number'
        && typeof command[1] !== 'function'
        && !(command[1] instanceof Array)) {
        throw commandError;
      }
      if (command[1] instanceof Array) {
        for (const fn of command[1]) {
          if (typeof fn !== 'function') throw commandError;
        }
      }
    }

    commands = expandRepeats(cmds);
    commandPointer = 0;
  }

  if (intervalID === null) {
    clockTick = tick;
    timeoutUntil = Date.now();

    handleTick(); // handle tick immediately
    intervalID = setInterval(handleTick, clockTick);
  }
}

/**
 * Stop the fetch engine from executing any other ticks. Not guaranteed to stop immediately.
 * @param {boolean} resetCommands - Boolean indicating whether to reset the commands in memory.
 * 
 * @public
 */
function stop(resetCommands = false) {
  if (typeof resetCommands !== 'boolean') throw new TypeError('resetCommands must be of type boolean');

  if (intervalID !== null) {
    clearTimeout(intervalID);
    intervalID = null;
  }
  if (resetCommands) {
    commands = null;
    commandPointer = 0;
  }
}


/**
 * Handle processing an engine tick.
 * 
 * @private
 */
async function handleTick() {
  // Only handle next command if timeout has completed.
  if (Date.now() - timeoutUntil < 0) return;

  const [command, argument] = commands[commandPointer];

  // Increment command pointer to continue looping through commands array
  commandPointer = (commandPointer + 1) % commands.length;

  switch (command) {
    case 'SKIP':
      timeoutUntil = Date.now() + argument;
      break;
    case 'RUN':
      if (argument instanceof Array) argument.forEach(callback => callback());
      else argument();
      break;
    default:
      throw new Error(`Unknown command: ${command}.`);
  }
}

/**
 * Converts the command array with possible repeats into an array command where each repeat is a separate command.
 * @param {[string, number | function | [functions]]} cmds - Array of commands
 */
function expandRepeats(cmds) {
  // TODO improve logic to handle repeats without creating this large array in memory.

  if (cmds[0][0] === 'REPEAT') throw new Error('First command cannot be REPEAT');

  const expandedCmds = [];
  cmds.forEach((command, i) => {
    if (command[0] === 'REPEAT') {
      expandedCmds.push(...(new Array(command[1]).fill(cmds[i - 1])));
    } else {
      expandedCmds.push(command);
    }
  });

  return expandedCmds;
}

module.exports = { start, stop };
