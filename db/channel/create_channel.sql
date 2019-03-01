insert into channels (
    name,
    owner_id
) values (
    $1,
    $2
) 
returning *;