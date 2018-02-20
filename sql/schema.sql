CREATE DATABASE admin;

USE admin;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `bloodGroup` varchar(5) NOT NULL,
  `email` text NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `address` varchar(20) NOT NULL,
  `dob` varchar(20) NOT NULL,
  `policy` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

INSERT INTO `users`(name, bloodGroup, email, phone_number, address, dob, policy) VALUES
  ('Anna', 'A+', 'a.kowalska@o2.pl', '+48 123 456 789', 'Krakow, Polska', '1992/03/01', '1'),
  ('Jan', 'AB+', 'jka23@gmail.com', '+48 501 777 888', 'Warszawa, Polska', '1989/06/18', '1'),
  ('Maria', 'B-', 'merry52@gmail.com', '+48 501 555 666', 'Lublin, Polska', '1985/12/05', '1');