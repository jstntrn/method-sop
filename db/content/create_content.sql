insert into content_cards (
    slide_id,
    type,
    title,
    content,
    url
) values (
    $1,
    $2,
    $3,
    $4,
    $5
)
returning *;