insert into permissions (
    channel_id,
    view,
    email
) values (
    $1,
    $2,
    $3
) 
returning *;