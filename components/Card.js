import styles from '@/styles/Card.module.css'

export default function Card({ name, price, src, largeSrc, handleClick }) {
  return <div className={styles.wrapper}>
    <img src={src} alt={name} onClick={() => { handleClick(largeSrc) }} />
    <p>{name}</p>
    <p>{price}</p>
  </div>
}