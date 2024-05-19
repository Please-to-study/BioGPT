CREATE TABLE biogpt_user (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username   varchar(16)  not null,
    password varchar  not null,
    create_time TIMESTAMP NOT NULL DEFAULT now(),
    update_time TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE biogpt_data_analysis (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username   varchar(16)  not null,
    prompt varchar not null,
    filename varchar not null,
    data_analysis text[],
    result varchar
);