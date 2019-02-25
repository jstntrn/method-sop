select * from (
    select *,
        row_number() over (partition by video_url order by id) as row_number
        from videos
) as rows
where row_number = 1 and user_id = $1;