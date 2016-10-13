import gulp from 'gulp';
import rename from 'gulp-rename';
import changed from 'gulp-changed';
import responsive from 'gulp-responsive';

const
  name = 'resize',
  files = 'source/**/resize/*',
  there = 'public/image',
  production = process.env.NODE_ENV === 'production',
  config = {
    '*': [{
      width: '100%'
    }, {
      width: '70%',
      rename: {
        suffix: '_tablet'
      }
    }, {
      width: '40%',
      rename: {
        suffix: '_mobile'
      }
    }]
  };

let param = {
  quality: 100,
  progressive: false,
  compressionLevel: 0,
  stats: false,
  silent: true,
  errorOnEnlargement: false,
  errorOnUnusedConfig: false,
  withoutEnlargement: false
};

if (production) {
  param.quality = 60;
  param.progressive = true;
  param.compressionLevel = 8;
}

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(rename({dirname: ''}))
  .pipe(changed(there))
  .pipe(responsive(config, param))
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(files, gulp.series(name));
}

// configWebp = {
//   '*': [{
//     width: '100%'
//   }, {
//     width: '100%',
//     rename: {
//       extname: '.webp'
//     }
//   }, {
//     width: '70%',
//     rename: {
//       suffix: '_tablet'
//     }
//   }, {
//     width: '70%',
//     rename: {
//       suffix: '_tablet',
//       extname: '.webp'
//     }
//   }, {
//     width: '40%',
//     rename: {
//       suffix: '_mobile'
//     }
//   }, {
//     width: '40%',
//     rename: {
//       suffix: '_mobile',
//       extname: '.webp'
//     }
//   }]
// };
