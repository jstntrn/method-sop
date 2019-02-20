insert into content_cards (
    slide_id,
    type,
    title,
    content
) values (
    $1,
    $2,
    $3,
    $4
)
returning *;