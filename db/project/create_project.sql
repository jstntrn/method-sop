insert into projects (
    video_id,
    user_id,
    title,
    image_url,
    channel_id
) values (
    $1,
    $2,
    $3,
    $4,
    $5
)
returning *;