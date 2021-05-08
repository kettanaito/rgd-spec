import capitalize from '../../strings/capitalize'
import Layout from '../../../Layout'
import propAliases from '../../../const/propAliases'
import memoizeWith from '../memoizeWith'

const breakpoints = Object.keys(Layout.breakpoints)
const responsiveProps = Object.keys(propAliases)
const allResponsiveProps = responsiveProps.reduce((acc, prop) => {
  return acc.concat(
    prop,
    `${prop}Down`,
    `${prop}Only`,
    ...breakpoints.map((breakpointName) => {
      const responsivePropName = `${prop}${capitalize(breakpointName)}`
      return [`${responsivePropName}Down`, `${responsivePropName}Only`]
    }),
  )
}, [])
const regExp = new RegExp(allResponsiveProps.join('|'))

function omitProps<P extends Record<string, any>>(props: P) {
  return Object.keys(props).reduce((acc, key) => {
    if (!regExp.test(key)) {
      acc[key] = props[key]
    }

    return acc
  }, {} as Record<string, any>)
}

const memoizeWithPairs = memoizeWith<typeof omitProps>((props) =>
  Object.keys(props)
    .map((key) => [key, props[key]])
    .join(),
)

export default memoizeWithPairs(omitProps)
