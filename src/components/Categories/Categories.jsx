import React from 'react'

const Categories = () => {
    const selectOption = genres.map((genre) => {
        return (
          <pption key={genre.id} value={genre.id}>
            {genre.name}
          </pption>
        );
      });
  return (
    <div>
        <select mode="multiple" placeholder="Please select genre">
          {selectOption}
        </select>
    </div>
  )
}

export default Categories