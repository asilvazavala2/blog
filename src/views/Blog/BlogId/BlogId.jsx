import { BlogCategories } from '../../../components/BlogCategories/BlogCategories'
import { BlogMostViewed } from '../../../components/BlogMostViewed/BlogMostViewed'
import styles from '../Blog.module.css'
import { useParams } from 'react-router-dom'
import { Link } from 'react-scroll';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { usePublications } from '../../../hooks/usePublications'
import { searchPublicationById } from '../../../redux/actions'
import { Comments } from '../../../components/Comments/Comments'

export const BlogId = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { detailPublication } = usePublications()

  useEffect(() => {
    dispatch(searchPublicationById(id));
  },[dispatch, id]);

  return (
    <section className={styles.containerBlog}>
      <main className={styles.main}>
        {detailPublication && detailPublication.map(el => {
          return (
            <ul key={el.id}>
              <li>
                <h1>{el.title}</h1>
                <p className={styles.mainDateAuthor}>{el.date} por {el.author} - #{el.category} -
                  <Link className={styles.mainComment} activeClass="active" smooth={true}
                    offset={-70} duration={500} spy={true} to={'comments'}>Deja tu comentario
                  </Link> 
                </p>
                <img src={el.image} alt={el.title} />
                <p className={styles.mainDescriptionId}>{el.description}</p>
              </li>
            </ul>
          )
        })}
        <div id='comments' className={styles.comments}>
          <Comments />
        </div>
      </main>

      {/* Menu lateral derecho */}
      <aside className={styles.rightMenu}>
        <BlogMostViewed />
        <BlogCategories />
      </aside>
    </section>
  )
}
