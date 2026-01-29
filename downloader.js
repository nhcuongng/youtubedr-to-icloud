var fs = require("fs-extra");
var exec = require("child_process").exec;
var { DOWNLOAD_FOLDER, TARGET_FOLDER } = require("./utils");

const extractMusic = (musics) => {
  if (!fs.existsSync(TARGET_FOLDER)) {
    fs.mkdirSync(TARGET_FOLDER);
  }

  musics.forEach((item) => {
    const { href, title } = item;

    const mp3File = `${TARGET_FOLDER}/${title}.mp3`;

    if (!fs.existsSync(mp3File)) {
      exec(
        `
        youtubedr -d ${DOWNLOAD_FOLDER} -o ${title}.mp4 download -q 18 ${href} && cd ./${DOWNLOAD_FOLDER} && ffmpeg -i ${title}.mp4 -q:a 0 -map a ${title}.mp3 && rm -rf ${title}.mp4
      `,
        (err, stdout, stderr) => {
          if (err) {
            console.log("🚀 ~ extractMusic ~ err:", err);
            // node couldn't execute the command
            return;
          }

          // the *entire* stdout and stderr (buffered)
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
          fs.copy(
            `${DOWNLOAD_FOLDER}/${title}.mp3`,
            `${TARGET_FOLDER}/${title}.mp3`,
            (err) => {
              if (err) return console.error(err);
              console.log("success!");
            },
          );
        },
      );
    } else {
      console.log(`${title}.mp4 already exists, skipping download`);
    }
  });
};

exports.extractMusic = extractMusic;
