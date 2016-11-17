import gulp from 'gulp';
import named from 'vinyl-named';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import del from 'del';

const name = 'rev';
const pathRevFiles = 'public/**/*.{html,css,js}';
const revFiles = [/* 2 */
  'public/**/*.*',
  '!public/*.{html,txt,xml}'
];
const there = 'public';

let delFiles = [];

gulp.task(name,
  gulp.series(
    getOldFileNames,
    revFilesFn,
    replace,
    delFilesFn
  )
);

/**
 * Собирает имена файлов в массив для удаления устаревших файлов
 */
function getOldFileNames() {
  return gulp.src(revFiles)
  .pipe(named(file => delFiles.push(`${there}/${file.relative}`)))
}

/**
 * Версионирует файлы и создает манифест переименований
 */
function revFilesFn() {
  return gulp.src(revFiles)
  .pipe(rev())
  .pipe(gulp.dest(there))
  .pipe(rev.manifest())
  .pipe(gulp.dest('temp'))
}

/**
 * Переименовывает имена файлов согласно манифесту переименования
 */
function replace() {
  return gulp.src(pathRevFiles)
  .pipe(revReplace({manifest: gulp.src('temp/rev-manifest.json')}))
  .pipe(gulp.dest(there))
}

/**
 * Удаляет устаревшие (после версионирования) файлы
 */
function delFilesFn() {
  return del(delFiles);
}
