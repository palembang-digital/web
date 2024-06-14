'use client';

import { useEffect, useState } from 'react';

function EventPage({ params }: { params: { slug: string; }; }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/events/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [params.slug]);

  return (
    <div>
      <p>Event page goes here: {params.slug}</p>
      {!isLoading && <p>{JSON.stringify(data)}</p>}
    </div>
  );
}

export default EventPage;
