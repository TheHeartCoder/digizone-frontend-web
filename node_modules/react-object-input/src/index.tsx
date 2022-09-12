import React, {useState, ReactElement, useCallback, useRef} from 'react'

export interface ObjectInputProps<T> {
  renderItem: (
    name: string,
    value: T | undefined,
    changeName: (newName: string) => void,
    changeValue: (newValue: T) => void,
    deleteProperty: () => void
  ) => ReactElement
  onChange: (updater: (c: {[name: string]: T}) => {[name: string]: T}) => void
  obj: {[name: string]: T}
  renderAdd?: (addItem: () => void) => ReactElement
  renderEmpty?: () => ReactElement
}

export const ObjectInput = <T extends {}>({
  obj,
  onChange,
  renderItem,
  renderAdd = addItem => <button onClick={addItem}>Add item</button>,
  renderEmpty
}: ObjectInputProps<T>) => {
  const [, setRenderKey] = useState(Math.random())
  const forceRender = useCallback(() => setRenderKey(Math.random), [])

  // stores the keys and values in order so they can be rendered consistently
  // updated in parallel with the input, and also checked each render for any
  // external data changes
  const localRef = useRef<[string | undefined, T | undefined][]>([])

  // add a new empty item to the local array
  const addItem = useCallback(() => {
    localRef.current.push([undefined, undefined])
    forceRender()
  }, [forceRender])

  // purge and update items altered externally
  localRef.current = localRef.current
    .filter(([key, value]) => !(key && value && !(key in obj)))
    .map(([key, value]) => [
      key,
      key && value && obj[key] !== value ? obj[key] : value
    ])

  // append any items added externally
  Object.keys(obj).forEach(key => {
    if (!localRef.current.find(([k]) => k === key)) {
      localRef.current.push([key, obj[key]])
    }
  })

  return (
    <>
      {renderEmpty && !localRef.current.length ? renderEmpty() : null}
      {localRef.current.map(([name, value], i) => (
        <React.Fragment key={i}>
          {renderItem(
            name || '',

            value,

            newName => {
              const clash =
                localRef.current.findIndex(item => item[0] === newName) !== -1

              // prevent overwrites of existing items
              // TODO work out how to keep this value transiently
              if (clash && value) {
                return
              }

              localRef.current[i] = [newName, value]

              onChange(c => {
                const updated = {...c}

                if (value) {
                  updated[newName] = value
                  if (typeof name === 'string') {
                    delete updated[name]
                  }
                }

                return updated
              })
            },

            newValue => {
              const clash =
                value === undefined &&
                localRef.current.findIndex(
                  item => item[0] === name && item[1] !== undefined
                ) !== -1

              // prevent overwrites of existing items
              // TODO work out how to keep this value transiently
              if (clash) {
                return
              }

              localRef.current[i] = [name, newValue]

              if (typeof name === 'string') {
                onChange(c => ({
                  ...c,
                  [name]: newValue
                }))
              } else {
                forceRender()
              }
            },

            () => {
              localRef.current.splice(i, 1)
              onChange(c => {
                const updated = {...c}
                if (typeof name === 'string') {
                  delete updated[name]
                }
                return updated
              })
            }
          )}
        </React.Fragment>
      ))}

      {renderAdd(addItem)}
    </>
  )
}
