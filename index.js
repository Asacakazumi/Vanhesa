const Discord = require('discord.js-selfbot-v13');
const os = require('os');
const osUtils = require('os-utils');
const config = require('./config.json');

const client = new Discord.Client();

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

let startTime = Date.now();

  // Update presence every 5 seconds with system stats
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const { downloadSpeed, uploadSpeed } = getRandomInternetSpeed();

    const uptime = calculateUptime(startTime);

    const r = new Discord.RichPresence()
      .setApplicationId('962140882235195462')
      .setType('PLAYING')
      .setName('LinuxxMD 🛐')
      .setDetails(`CPU: ${cpuUsage.toFixed(2)}% RAM: ${ramUsage.toFixed(2)}% | Uptime: ${uptime}`)
      .setState(`Download: ${downloadSpeed.toFixed(2)} MB/s | Upload: ${uploadSpeed.toFixed(2)} MB/s`)
      .setStartTimestamp(Date.now())
      .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1165331380419448874/1174799266598891701/dancing-oshi-no-ko.gif')
      .setAssetsLargeText('LinuxxMD')
      .setAssetsSmallImage('https://cdn.discordapp.com/attachments/1165331380419448874/1174799267001532586/verified.gif')
      .setAssetsSmallText('🍉')
      .addButton('Unemployment', 'https://discord.com/invite/JkMqE7tHKT');

    client.user.setActivity(r);
  }, 3000); // Update every 3 seconds
});

client.login(config.token);

// Function to get CPU usage percentage
async function getCpuUsage() {
  return new Promise((resolve, reject) => {
    osUtils.cpuUsage((cpuUsage) => {
      resolve(cpuUsage * 100);
    });
  });
}

// Function to get RAM usage percentage
function getRamUsage() {
  return osUtils.freememPercentage() * 100;
}

// Function to get random internet speed
function getRandomInternetSpeed() {
  const downloadSpeed = getRandomNumber(1, 100);
  const uploadSpeed = getRandomNumber(1, 100);
  return { downloadSpeed, uploadSpeed };
}

// Helper function to get random number in a range
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to calculate uptime
function calculateUptime(startTime) {
  const uptimeMillis = Date.now() - startTime;
  const days = Math.floor(uptimeMillis / (1000 * 60 * 60 * 24));
  const hours = Math.floor((uptimeMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((uptimeMillis % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((uptimeMillis % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
} 

  "name": "Streaming-24-7-RPC",
  "version": "1.0.0",
  "description": "Allows",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "license": "ISC",
  "dependencies": {
    "discord.js-selfbot-v13": "^2.10.1",
    "express": "^4.18.2",
    "node-fetch": "^3.2.6",
    "os-utils": "^0.0.14"
  }
}