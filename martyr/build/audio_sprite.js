import gulp from 'gulp';
import audioSprite from 'gulp-audiosprite';
import util from 'gulp-util';

const
  name = 'audio_sprite',
  files = 'source/**/audio_sprite/*',
  there = 'public/audio',
  production = process.env.NODE_ENV === 'production';

let config = {
  output: 'audio_sprite',
  path: 'audio',
  export: 'mp3',
  format: 'howler',
  log: 'notice',
  channels: 2
};

if (production) {
  config.bitrate = 80;
}

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(audioSprite(config))
  .pipe(gulp.dest(there))
  .on('data', () => util.log(name + 'script не подхватывает изменения в json'))
});

if (!production) {
  gulp.watch(files, gulp.series(name));
}

/** TODO решить с инкрементальностью. script не подхватывает изменения в json */
