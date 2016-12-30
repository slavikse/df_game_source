import gulp from 'gulp';
import plumber from 'gulp-plumber';
import error from './../utility/error';
import postcss from 'gulp-postcss';
import cached from 'postcss-cached';
import atImport from 'postcss-import';
import nested from 'postcss-nested';
import willChange from 'postcss-will-change'; // fallback will-change
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import flexbugs from 'postcss-flexbugs-fixes';

const name = 'style';
const files = 'source/*.css';
//TODO что если не будет в temp стилей?
const wFiles = '{source,temp}/**/*.css'; // temp: стили для спрайта
const there = 'public';
const production = process.env.NODE_ENV === 'production';
const options = [
  cached,
  atImport,
  nested
];
const browsers = [
  'ie >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4'
];

if (production) {
  options.push(
    willChange,
    autoprefixer({browsers: browsers}),
    csso,
    flexbugs
  )
}

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(plumber({errorHandler: error}))
  .pipe(postcss(options))
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(wFiles, gulp.parallel(name));
}
