INSERT INTO department (department_name)
VALUES
    ('Produce'),
    ('Bakery'),
    ('Deli'),
    ('Seafood'),
    ('Market'),
    ('Grocery');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Produce Manager', 86534.57, 1),
    ('Produce Lead', 45556.64, 1),
    ('Produce Specalist', 35478.22, 1),
    ('Produce Representative', 28775.88, 1),
    ('Bakery Manager', 76234.57, 2),
    ('Bakery Lead', 42536.64, 2),
    ('Bakery Specalist', 33478.22, 2),
    ('Bakery Representative', 26775.88, 2),
    ('Deli Manager', 79534.57, 3),
    ('Deli Lead', 42556.64, 3),
    ('Deli Specalist', 33478.22, 3),
    ('Deli Representative', 28275.88, 3),
    ('Seafood Manager', 76534.57, 4),
    ('Seafood Lead', 38556.64, 4),
    ('Seafood Specalist', 31478.22, 4),
    ('Seafood Representative', 28275.88, 4),
    ('Market Manager', 89534.57, 5),
    ('Market Lead', 45856.64, 5),
    ('Market Specalist', 37478.22, 5),
    ('Market Representative', 29975.88, 5),
    ('Grocery Manager', 84534.57, 6),
    ('Grocery Lead', 43556.64, 6),
    ('Grocery Specalist', 35178.22, 6),
    ('Grocery Representative', 28875.88, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
  ('James', 'Fraser', 1),
  ('Jack', 'London', 2),
  ('Robert', 'Bruce', 2),
  ('Peter', 'Greenaway', 3),
  ('Derek', 'Jarman', 3),
  ('Paolo', 'Pasolini', 4),
  ('Heathcote', 'Williams', 4),
  ('Sandy', 'Powell', 4),
  ('Emil', 'Zola', 4),
  ('Sissy', 'Coalpits', 4),
  ('Antoinette', 'Capet', 5),
  ('Samuel', 'Delany', 6),
  ('Tony', 'Duvert', 7),
  ('Dennis', 'Cooper', 7),
  ('Monica', 'Bellucci', 8),
  ('Samuel', 'Johnson', 8),
  ('John', 'Dryden', 8),
  ('Alexander', 'Pope', 8),
  ('Lionel', 'Johnson', 8),
  ('Aubrey', 'Beardsley', 9),
  ('Tulse', 'Luper', 10),
  ('William', 'Morris', 10),
  ('George', 'Shaw', 11),
  ('Arnold', 'Bennett', 11),
  ('Algernon', 'Blackwood', 12),
  ('Rhoda', 'Broughton', 12),
  ('Hart', 'Crane', 12),
  ('Vitorio', 'DeSica', 12),
  ('Wilkie', 'Collins', 13),
  ('Elizabeth', 'Gaskell', 14),
  ('George', 'Sand', 15),
  ('Vernon', 'Lee', 15),
  ('Arthur', 'Machen', 16),
  ('Frederick', 'Marryat', 16),
  ('Harriet', 'Martineau', 16),
  ('George', 'Meredith', 16),
  ('Margaret', 'Oliphant', 16),
  ('Anthony', 'Trollope', 17),
  ('Charlotte', 'Yonge', 18),
  ('Horace', 'Walpole', 19),
  ('Matthew', 'Lewis', 19),
  ('William', 'Bedford', 20),
  ('Anne', 'Radcliffe', 20),
  ('Charles', 'Brown', 21),
  ('Eliza', 'Parsons', 22),
  ('Susan', 'Hill', 23),
  ('Sydney', 'Owenson', 23),
  ('Hubert', 'Crackanthorpe', 24),
  ('William', 'Carleton', 24),
  ('William', 'Stock', 24),
  ('Gerald', 'Griffin', 24); 