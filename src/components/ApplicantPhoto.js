export default function ApplicantPhoto(props) {
    const {photo, name } = props
  return (
    <>
      <img src={photo} alt={name} width="80" style={{position:'relative', bottom:0}} />
    </>
  )
}
