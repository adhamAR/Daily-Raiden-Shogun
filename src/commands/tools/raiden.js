const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const embed = require("./embed");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("raiden")
    .setDescription("Sends random image of Raiden Shogun"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder();

    async function getData() {
      await fetch(
        "https://api.waifu.im/random/?selected_tags=raiden-shogun"
      ).then(async (res) => {
        let data = await res.json();

        let url = data.images[0].url;
        let source = data.images[0].source;
        let color = data.images[0].dominant_color;

        return interaction.reply({
          embeds: [
            embed
              .setTitle("💜⚡ Daily Raiden Shogun ⚡💜")
              .setImage(url)
              .setColor(color)
              .addFields({
                name: `Original artist:`,
                value: `🔗 ${source}`
              })
          ],
        });
      });
    }
    await getData();
  },
};

("https://api.waifu.im/random/?selected_tags=raiden-shogun");
