import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { readdir } from 'fs/promises';
import * as path from 'path';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

//   async startRecording() {

// // const directoryPath = '\\\\IIS-NAS\\IIS-Data\\sohail';

// // // Read the directory contents
// // try {
// //   const files = await readdir(directoryPath);
// //   console.log(files.length);
// //   return { count: files.length, files };
// // } catch (error) {
// //   throw new Error(`Error reading the directory: ${error.message}`);
// // }





//     const rtspUrl = 'rtsp://admin:admin@10.10.12.202:554/nvr_ch02';
//     // const outputPath = 'output.mp4'; // Specify your output file path here
//     const outputPath = '\\\\IIS-NAS\\IIS-Data\\sohail\\20240328104821053.mp4'
   

//     // Adjusted FFmpeg command to transcode audio to AAC and limit the recording to 2 minutes
//     const ffmpegCommand = `ffmpeg -t 30 -i "${rtspUrl}" -acodec aac -vcodec copy ${outputPath}`;

//     // Execute the FFmpeg command using child_process.exec
//     exec(ffmpegCommand, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`exec error: ${error}`);
//         return;
//       }
//       console.log(`stdout: ${stdout}`);
//       console.error(`stderr: ${stderr}`);
//     });
//   }

async startRecording(): Promise<void> {
  const rtspUrl: string = 'rtsp://admin:admin@10.10.12.202:554/nvr_ch02';
  const directoryPath: string = '\\\\IIS-NAS\\IIS-Data\\sohail';
  const currentDate: string = this.getFormattedDate(); // ISO date with colons replaced for filename safety
  const outputPath: string = path.join(directoryPath, `${currentDate}.mp4`);

  const ffmpegCommand: string = `ffmpeg -t 3600 -i "${rtspUrl}" -acodec aac -vcodec copy "${outputPath}"`;

  try {
    await this.execFFmpeg(ffmpegCommand);
    console.log('Recording completed successfully');
  } catch (error) {
    console.error(`Error during recording: ${error.message}`);
    throw new Error(`Error executing recording process: ${error.message}`);
  }
}


private execFFmpeg(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = exec(command);

    process.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('out_time_ms')) {
        const timeMs = output.split('=')[1].trim();
        const timeSec = Math.floor(parseInt(timeMs, 10) / 1000000);
        console.log(`Recorded duration: ${timeSec} seconds`);
      }
    });

    process.stderr.on('data', (data) => {
      console.error(`FFmpeg stderr: ${data}`);
    });

    process.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });

    process.on('error', (error) => {
      console.error(`FFmpeg process error: ${error}`);
      reject(error);
    });
  });
}

private getFormattedDate(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  const millisecond = date.getMilliseconds().toString().padStart(3, '0');
  return `${year}${month}${day}${hour}${minute}${second}${millisecond}`;
}
}
