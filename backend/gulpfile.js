const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const nodemon = require('gulp-nodemon');


// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});

gulp.task('nodemon', function(){
  nodemon({
      script: 'dist/app.js',
      ext: 'js',
      env:{
          PORT:8000
      },
      ignore: ['./node_modules/**']
  })
  .on('restart', function(){
      console.log('Restarting...')
  });
});

gulp.task('default', ['watch', 'assets', 'nodemon']);