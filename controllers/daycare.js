const Careday = require('../models/Careday');

/**
 * GET /daycare
 * daycare  page.
 */
exports.getDaycare = (req, res) => {
  console.log("#### getDaycare ####");
  const unknownUser = !(req.user);

  res.render('daycare', {
    title: 'Daycare',
    unknownUser,
  });
};


/**
 * POST /signup
 * Create a new local account.
 */
exports.postDay = (req, res, next) => {
  console.log("#### postDay ####");

  console.log("#### body ####");
  console.log(req.body);
  console.log("#### body ####");
  /*
  email: String,
  day: Date,
  used: Boolean,
  */

  req.assert('email', 'Email is not valid').isEmail();
  console.log("0");
  console.log(req.validationErrors());
  //console.log(errors);

  req.assert('date', 'Date not valid').isISO8601("YYYY-MM-DD");
  console.log("1");
  console.log(req.validationErrors());
  //console.log(errors);

  req.assert('date', 'Date not in right format').matches(/^\d{4}-\d{1,2}-\d{1,2}$/);
  console.log("1a");
  console.log(req.validationErrors());

  req.assert('used', 'Used not a Boolean').isBoolean();
  console.log("2");
  console.log(req.validationErrors());
  //console.log(errors);

  const errors = req.validationErrors();

  console.log("#### errors ####");
  console.log(errors);
  console.log("#### end errors ####");

  //console.log(errors);

  if (errors) {
  	console.log("A2");
    req.flash('errors', errors);
    return res.redirect('/daycare');
  }



  console.log("B");

  const careday = new Careday({
    email: req.body.email,
    day: req.body.date,
    used: req.body.used
  });
  console.log(careday);

  console.log("C");

  careday.save((err) => {
      if (err) { 
      	console.log(err);
      	return next(err);
      }
      console.log("Saved succes!");
      req.flash('success', { msg: 'Day has been stored succesfully!' });
      res.redirect('/daycare');
    });

};