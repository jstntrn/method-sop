insert into channels (
    user_id,
    channel_id,
    view
) values (
    $1,
    $2,
    $3
) 
returning *;