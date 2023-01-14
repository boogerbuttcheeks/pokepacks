import styles from '@/styles/Card.module.css'

export default function Card({ name, price, src }) {
  return <div className={styles.wrapper}>
    <img src={src} alt={name} />
    <p>{name}</p>
    <p>{price}</p>
  </div>
}